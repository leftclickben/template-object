/*jslint node: true, nomen: true, white: true, unparam: true*/
/*!
 * Sitegear3
 * Copyright(c) 2014 Ben New, Sitegear.org
 * MIT Licensed
 */

(function (_) {
	"use strict";

	var templateSettingsShortcuts = {
			mustache: {
				interpolate: /\{\{\s*([\w\.\-]+?)\s*\}\}/g
			}
		};

	module.exports = function (object, templateSettings) {
		if (_.isString(templateSettings)) {
			templateSettings = templateSettingsShortcuts[templateSettings];
		}
		_.each(object, function (childSettings, childSettingsKey) {
			if (_.isPlainObject(childSettings) || _.isArray(childSettings)) {
				object[childSettingsKey] = module.exports(childSettings);
			} else if (_.isString(childSettings)) {
				object[childSettingsKey] = _.template(childSettings, object, templateSettings);
			}
		});
		return object;
	};
}(require('lodash')));
