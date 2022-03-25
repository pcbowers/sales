import documentStore from "part:@sanity/base/datastore/document"
import { map } from "rxjs/operators"

export default (filter, params, callback) =>
  documentStore
    .listenQuery(`count(*[${filter}])`, params)
    .pipe(map((count) => callback(count, filter, params)))
