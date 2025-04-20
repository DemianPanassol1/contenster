import { contensterViews as contensterAdminViews } from './contenster/private';
import { contensterViews as contensterAuthViews } from './contenster/public';

import { portfolioViews as portfolioAdminViews } from './portfolio/private';

export const authViews = [...contensterAuthViews];
export const adminViews = [...contensterAdminViews, ...portfolioAdminViews];
