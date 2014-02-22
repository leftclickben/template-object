/*jslint node: true, nomen: true, white: true, unparam: true*/
/*!
 * Sitegear3
 * Copyright(c) 2014 Ben New, Sitegear.org
 * MIT Licensed
 */

(function (_) {
	"use strict";

	module.exports = function (originalSettings, settings) {
		// This function is not optimised as it is only called once (plus recursive calls) at application startup.
		if (!settings) {
			settings = originalSettings;
		}
		var regex = /^([\w\W]*?)\{\{\s*([\w\.\-]*)\s*\}\}([\w\W]*?)$/;
		_.each(settings, function (childSettings, childSettingsKey) {
			if (_.isPlainObject(childSettings) || _.isArray(childSettings)) {
				settings[childSettingsKey] = module.exports.expandSettings(originalSettings, childSettings);
			} else if (_.isString(childSettings)) {
				var replacementKey, replacementValue,
					doReplacement = function (replacementKeyComponent) {
						replacementValue = replacementValue && replacementValue.hasOwnProperty(replacementKeyComponent) ? replacementValue[replacementKeyComponent] : null;
					};
				while (regex.test(childSettings)) {
					replacementKey = childSettings.replace(regex, '$2');
					replacementValue = originalSettings;
					_.each(replacementKey.split('.'), doReplacement);
					childSettings = replacementValue ? childSettings.replace(regex, '$1' + replacementValue + '$3') : null;
				}
				settings[childSettingsKey] = childSettings;
			}
		});
		return settings;
	};
}(require('lodash')));
