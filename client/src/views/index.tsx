import { contensterViews as contensterAdminViews } from './contenster/private';
import { contensterViews as contensterAuthViews } from './contenster/public';

export const authViews = [...contensterAuthViews];
export const adminViews = [...contensterAdminViews];
