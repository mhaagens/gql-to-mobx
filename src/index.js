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
  const fieldMap = Object.assign({
    Int: types.number,
    String: types.string,
    Boolean: types.boolean,
    Enum: types.enumeration
  });

  const parsed = parse(type);

  const modelName = parsed.definitions[0].name.value;
  const model = {};

  for (let field of parsed.definitions[0].fields) {
    let fieldName = field.name.value;
    let fieldType = null;

    //console.log(inspect(field, null, 10))

    if (field.type.name) {
      fieldType = field.type.name.value;
    } else if (field.type.type) {
      fieldType = field.type.type.name.value;
    } else {
      throw new Error("Missing field name.");
    }

    if (
      fieldName.length &&
      fieldType.length &&
      (fieldMap[fieldType] || options.subtypes[fieldName])
    ) {
      if (!options.subtypes[fieldName]) {
        model[fieldName] = fieldMap[fieldType];
      }
    } else {
      throw new Error(`Field type ${fieldType} is missing from ${modelName}.`);
    }
  }
  console.timeEnd("parse");
  return types.model(`${modelName}`, Object.assign(model, options.subtypes));
};
