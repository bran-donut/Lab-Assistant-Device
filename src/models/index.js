// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Workspace, Staffs, Students, Labs } = initSchema(schema);

export {
  Workspace,
  Staffs,
  Students,
  Labs
};