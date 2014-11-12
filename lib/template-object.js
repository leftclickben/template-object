/*jslint node: true, nomen: true, white: true, unparam: true*/
/*!
 * Sitegear3
 * Copyright(c) 2014 Ben New, Sitegear.org
 * MIT Licensed
 */

(function (_) {
	"use strict";

	var processObject,
		templateSettingsShortcuts = {
			mustache: {
				interpolate: /\{\{\s*([\w\.\-]+?)\s*\}\}/g
			}
		};

	processObject = function (object, templateSettings, topLevelObject) {
		if (_.isString(templateSettings)) {
			templateSettings = templateSettingsShortcuts[templateSettings];
		}
		_.each(object, function (child, childKey) {
			if (_.isPlainObject(child) || _.isArray(child)) {
				object[childKey] = processObject(child, templateSettings, topLevelObject);
			} else if (_.isString(child)) {
				object[childKey] = _.template(child, topLevelObject, templateSettings);
			}
		});
		return object;
	};

	module.exports = function (object, templateSettings) {
		return processObject(object, templateSettings, object);
	};
}(require('lodash')));
