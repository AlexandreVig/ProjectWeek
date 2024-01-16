'use strict';

/**
 * school-data service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::school-data.school-data');
