import { queryString, parse } from './queryString';

describe('Object to query string', () => {
  it('should create a valid query string when a object is provided', () => {
    const obj = {
      name: 'Gustavo',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Gustavo&profession=developer');
  });

  it('should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Gustavo',
      abilities: ['JS', 'TDD'],
    };

    expect(queryString(obj)).toBe('name=Gustavo&abilities=JS,TDD');
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Gustavo',
      abilities: {
        first: 'JS',
        second: 'TDD',
      },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert a query string to object', () => {
    const qs = 'name=Gustavo&profession=developer';
    expect(parse(qs)).toEqual({
      name: 'Gustavo',
      profession: 'developer',
    });
  });

  it('should convert a query string of a single key-value pair to object', () => {
    const qs = 'name=Gustavo';
    expect(parse(qs)).toEqual({
      name: 'Gustavo',
    });
  });

  it('should convert a query string to an object taking care of a comma separate', () => {
    const qs = 'name=Gustavo&abilities=JS,TDD';

    expect(parse(qs)).toEqual({
      name: 'Gustavo',
      abilities: ['JS', 'TDD'],
    });
  });
});
