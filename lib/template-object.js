/*jslint node: true, nomen: true, white: true, unparam: true, todo: true*/
/*!
 * Sitegear3
 * Copyright(c) 2014 Ben New, Sitegear.org
 * MIT Licensed
 */

(function (_) {
	"use strict";

	module.exports = function (object, templateSettings) {
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
