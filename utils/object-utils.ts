/**
 * Replace properties in an object based on a mapping
 * @param obj - The object to modify
 * @param propertyMapping - A mapping of old property names to new property names or transformation functions
 * @returns A new object with replaced properties
 * @example
 * replaceProperties({ name: 'John', age: 30 }, { name: 'fullName' })
 * // => { fullName: 'John', age: 30 }
 * @example
 * replaceProperties({ firstName: 'John', age: 30 }, {
 *   firstName: (val) => ({ name: val })
 * })
 * // => { name: 'John', age: 30 }
 */
export const replaceProperties = <T extends Record<string, any>>(
  obj: T,
  propertyMapping: Record<string, string | ((value: any) => Record<string, any>)>
): Record<string, any> => {
  const result = { ...obj };

  Object.entries(propertyMapping).forEach(([oldKey, newKeyOrTransformer]) => {
    if (oldKey in result) {
      const value = result[oldKey];

      // If the mapping is a function, use it to transform the value
      if (typeof newKeyOrTransformer === 'function') {
        const transformed = newKeyOrTransformer(value);
        delete result[oldKey];
        Object.assign(result, transformed);
      } else {
        // If the mapping is a string, rename the property
        result[newKeyOrTransformer as keyof T] = value;
        delete result[oldKey];
      }
    }
  });

  return result;
};

/**
 * Replace properties in an object while preserving original object structure
 * @param obj - The object to modify
 * @param propertyMapping - A mapping of property names to their new values
 * @returns A new object with replaced property values
 * @example
 * replacePropertyValues({ status: 'active', type: 'user' }, { status: 'inactive', type: 'admin' })
 * // => { status: 'inactive', type: 'admin' }
 */
export const replacePropertyValues = <T extends Record<string, any>>(
  obj: T,
  propertyMapping: Partial<Record<keyof T, any>>
): T => {
  return {
    ...obj,
    ...propertyMapping,
  };
};
