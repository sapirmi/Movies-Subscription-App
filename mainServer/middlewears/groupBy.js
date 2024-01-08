function group(data, idField, groupField) {
    return data.reduce((acc, item) => {
      if (acc[item[idField]]) {
        acc[item[idField]][groupField].push(...item[groupField]);
      } else {
        acc[item[idField]] = {
          ...item,
          [groupField]: [...item[groupField]],
        };
      }
      return acc;
    }, {});
  }


module.exports = {group}