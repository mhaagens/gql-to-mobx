import { parse } from "graphql";
import { types } from "mobx-state-tree";
import { inspect } from "util";

export default (
  type,
  options = {
    subtypes: {}
  }
) => {

  console.time("parse");

  // Map GQL types to MST types
  const fieldMap = {
    Int: types.number,
    String: types.string,
    Boolean: types.boolean,
    Enum: types.enumeration
  };

  // Parse GQL AST
  const { definitions } = parse(type);

  // Get the name of the model
  const modelName = definitions[0].name.value;

  // Initialize model object
  const model = {};

  // Parse type fields
  for (let field of definitions[0].fields) {
    
    // Set field name
    let fieldName = field.name.value;
    // Ready field type
    let fieldType = null;

    //console.log(inspect(field, null, 10))

    if (field.type.name) {
      // If regular field
      fieldType = field.type.name.value;
    } else if (field.type.type) {
      // If required field (?)
      fieldType = field.type.type.name.value;
    } else {
      // Field not found
      throw new Error("Missing field name.");
    }

    if (
      fieldName.length &&
      fieldType.length &&
      (fieldMap[fieldType] || options.subtypes[fieldName])
    ) {
      // If we have a field with name and a type/subtype
      if (!options.subtypes[fieldName]) {
        // If it's a regular type, set the type, otherwise subtype is already passed in
        model[fieldName] = fieldMap[fieldType];
      }
    } else {
      throw new Error(`Field type ${fieldType} is missing from ${modelName}.`);
    }
  }
  console.timeEnd("parse");
  // Return the merged types!
  return types.model(`${modelName}`, Object.assign(model, options.subtypes));
};
