'use strict';
/*
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)        
 * to customize this controller
 */

module.exports = {
    async find(ctx) {
        try {
            const entities = await strapi.services['footer'].find()
            for (const i in entities.FooterNavItem) {

                if (entities.FooterNavItem[i].FooterNavSubItem) {
		    for (const l in entities.FooterNavItem[i].FooterNavSubItem) {
		        if (entities.FooterNavItem[i].FooterNavSubItem[l].Page) {
			    if (entities.FooterNavItem[i].FooterNavSubItem[l].Page.Parent) {
			        const parent = await strapi.query('pages').find({ id: entities.FooterNavItem[i].FooterNavSubItem[l].Page.Parent })
				if (parent) entities.FooterNavItem[i].FooterNavSubItem[l].Page.Parent = parent[0]
			    }
			}
		    }
                }
            }
            return JSON.stringify(entities);
        } catch (err) {
            return err;
        }
    }
};
