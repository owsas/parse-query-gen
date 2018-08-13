import * as Parse from 'parse/node';
import { ParseQueryGen, IParams } from './index';

test('should proccess ok the params', () => {
  ParseQueryGen.setParse(Parse);
  const params: IParams = {
    className: 'MyClass',
    equalTo: {
      key: 'value',
      key2: 'value2',
    },
    greaterThan: {
      key3: 'value',
      key4: 'value2',
    },
    lessThan: {
      key5: 'value',
      key6: 'value2',
    },
    notEqualTo: {
      key7: 'abc',
    },
    ascending: ['createdAt'],
    descending: ['updatedAt'],
    containedIn: {
      w: ['abc', '123'],
    },
    matches: {
      string: 'value',
    },
    select: ['abc', 'abc2'],
    containsAll: {
      w2: ['abc', '123'],
    },
    include: ['brand'],
    exists: ['test1', 'test2'],
    matchesQuery: {
      testKey: new Parse.Query('Test').equalTo('active', true),
    },
  };

  const q = ParseQueryGen.gen(params);

  const json = q.toJSON();

  expect(q instanceof Parse.Query);

  expect(q.className).toEqual(params.className);
  expect(json.where.key).toEqual(params.equalTo.key);
  expect(json.where.key2).toEqual(params.equalTo.key2);
  expect(json.where.key3).toEqual({ $gt: params.greaterThan.key3 });
  expect(json.where.key4).toEqual({ $gt: params.greaterThan.key4 });
  expect(json.where.key5).toEqual({ $lt: params.lessThan.key5 });
  expect(json.where.key6).toEqual({ $lt: params.lessThan.key6 });
  expect(json.where.key7).toEqual({ $ne: params.notEqualTo.key7 });
  expect(json.where.w).toEqual({ $in: params.containedIn.w });
  expect(json.where.w2).toEqual({ $all: params.containsAll.w2 });
  expect(json.where.string).toEqual({ $regex: params.matches.string });
  expect(json.include).toEqual('brand');
  expect(json.keys).toEqual(params.select.join(','));
  expect(json.order.indexOf('createdAt') !== -1).toBe(true);
  expect(json.order.indexOf('updatedAt') !== -1).toBe(true);
});
