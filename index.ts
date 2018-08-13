/* @tscheck false */
/* tslint:disable variable-name no-param-reassign */
import * as assert from 'assert';
import * as is from 'is';

let parse;

export interface IParams {
  className?: string; 
  equalTo?:{[key:string]: any}; 
  containedIn?:{[key:string]: any};
  notEqualTo?:{[key:string]: any}; 
  lessThan?:{[key:string]: any};
  greaterThan?:{[key:string]: any}; 
  containsAll?: {[key:string]: any};  
  include?: string[];
  exists?: string[];
  doesNotExist?: string[];
  descending?: string[]; 
  ascending?: string[]; 
  query ? : any;
  matches ? : {[key:string]: any;}; 
  select ? : string[];
  distinct? : string[];
  matchesQuery?: {[key:string]: any; };
}

export class ParseQueryGen {
  /**
   * 
   * @param {Parse} _Parse 
   */
  static setParse(_Parse) {
    parse = _Parse;
  }

  /**
   * @param params
   * @return {Parse.Query}
   */
  static gen(parameters: IParams = {}) {
    // default
    const params = Object.assign({}, parameters);
    params.equalTo = params.equalTo || {};
    params.notEqualTo = params.notEqualTo || {};
    params.containedIn = params.containedIn || {};
    params.containsAll = params.containsAll || {};
    params.include = params.include || [];
    params.ascending = params.ascending || [];
    params.descending = params.descending || [];
    params.greaterThan = params.greaterThan || {};
    params.lessThan = params.lessThan || {};
    params.matches = params.matches || {};
    params.select = params.select || [];
    params.distinct = params.distinct || [];
    params.exists = params.exists || [];

    // validation
    assert.ok(is.object(params));
    assert.ok(is.object(params.equalTo), JSON.stringify(params.equalTo));
    assert.ok(is.object(params.matches), JSON.stringify(params.matches));
    assert.ok(is.object(params.notEqualTo), JSON.stringify(params.notEqualTo));
    assert.ok(is.object(params.containedIn), JSON.stringify(params.containedIn));
    assert.ok(is.object(params.containsAll), JSON.stringify(params.containedIn));
    assert.ok(is.array(params.include));
    assert.ok(is.array(params.ascending));
    assert.ok(is.array(params.descending));
    assert.ok(is.array(params.select));
    assert.ok(is.array(params.exists));
    assert.ok(is.object(params.greaterThan));
    assert.ok(is.object(params.lessThan));

    const q = ((params.query || new parse.Query(params.className)) as Parse.Query);
    if (params.equalTo) {
      Object.keys(params.equalTo).forEach((key) => {
        if (params.equalTo[key]) {
          q.equalTo(key, params.equalTo[key]);
        }
      });
    }

    if (params.notEqualTo) {
      Object.keys(params.notEqualTo).forEach((key) => {
        if (params.notEqualTo[key]) {
          q.notEqualTo(key, params.notEqualTo[key]);
        }
      });
    }

    if (params.containedIn) {
      Object.keys(params.containedIn).forEach((key) => {
        if (params.containedIn[key]) {
          q.containedIn(key, params.containedIn[key]);
        }
      });
    }

    if (params.containsAll) {
      Object.keys(params.containsAll).forEach((key) => {
        if (params.containsAll[key]) {
          q.containsAll(key, params.containsAll[key]);
        }
      });
    }

    if (params.greaterThan) {
      Object.keys(params.greaterThan).forEach((key) => {
        if (params.greaterThan[key]) {
          q.greaterThan(key, params.greaterThan[key]);
        }
      });
    }

    if (params.lessThan) {
      Object.keys(params.lessThan).forEach((key) => {
        if (params.lessThan[key]) {
          q.lessThan(key, params.lessThan[key]);
        }
      });
    }

    if (params.matches) {
      Object.keys(params.matches).forEach((key) => {
        if (params.matches[key]) {
          q.matches(key, params.matches[key], undefined);
        }
      });
    }

    if (params.matchesQuery) {
      Object.keys(params.matchesQuery).forEach((key) => {
        if (params.matchesQuery[key]) {
          q.matchesQuery(key, params.matchesQuery[key]);
        }
      });
    }

    if (params.select.length) {
      q.select(...params.select);
    }

    if (params.include.length) {
      q.include(params.include);
    }

    if (params.ascending) {
      params.ascending.forEach((p) => {
        q.addAscending(p);
      });
    }

    if (params.descending) {
      params.descending.forEach((p) => {
        q.addDescending(p);
      });
    }

    if (params.distinct) {
      params.distinct.forEach((p) => {
        q.distinct(p);
      });
    }

    if (params.exists) {
      params.exists.forEach((p) => {
        q.exists(p);
      });
    }

    if (params.doesNotExist) {
      params.doesNotExist.forEach((p) => {
        q.doesNotExist(p);
      });
    }

    return q;
  }
}
