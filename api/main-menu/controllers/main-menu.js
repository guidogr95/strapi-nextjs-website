/*
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async find(ctx) {
	try {
	    const entities = await strapi.services['main-menu'].find();

 	    for (const i in entities.MenuItemMain) {

		if (entities.MenuItemMain[i].Page) {
		    if (entities.MenuItemMain[i].Page.Parent) {
		        const parent = await strapi.query('pages').find({ id: entities.MenuItemMain[i].Page.Parent })
			if (parent) entities.MenuItemMain[i].Page.Parent = parent[0]
		    }
		}

		for (const k in entities.MenuItemMain[i].NavSubmenu) {

		    for (const j in entities.MenuItemMain[i].NavSubmenu[k].SubMenuItem) {

			if (entities.MenuItemMain[i].NavSubmenu[k].SubMenuItem[j].Page) {
			    if (entities.MenuItemMain[i].NavSubmenu[k].SubMenuItem[j].Page.Parent) {
				const subParent = await strapi.query('pages').find({ id: entities.MenuItemMain[i].NavSubmenu[k].SubMenuItem[j].Page.Parent  })
				if (subParent) entities.MenuItemMain[i].NavSubmenu[k].SubMenuItem[j].Page.Parent = subParent[0]
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
