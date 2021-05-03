'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.pages.search(ctx.query);
    } else {
      entities = await strapi.services.pages.find(ctx.query);
    }
    for (const l in entities) {
	if (entities[l].Body) {
            for (const i in entities[l].Body) {
                if (entities[l].Body[i].__component === 'universal.card-grid-thumbnail-and-icon') {
                    for (const j in entities[l].Body[i].CardGridItem) {
                        if (entities[l].Body[i].CardGridItem[j].Page) {
                            if (entities[l].Body[i].CardGridItem[j].Page.Parent) {
                                const parent = await strapi.query('pages').find({ id: entities[l].Body[i].CardGridItem[j].Page.Parent })     
                                if (parent) entities[l].Body[i].CardGridItem[j].Page.Parent = parent[0]
                            }
                        }
                    }
                }
            }
        }
    }
    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.pages }));
  },
};
