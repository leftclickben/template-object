/*jslint node: true, nomen: true, white: true, unparam: true*/
/*globals describe, beforeEach, afterEach, it, expect, spyOn*/
/*!
 * Sitegear3
 * Copyright(c) 2014 Ben New, Sitegear.org
 * MIT Licensed
 */

(function (templateObject) {
	"use strict";

	describe('Utility Function: expandSettings()', function () {
		var settings = require('./_input/settings.json');
		beforeEach(function () {
			settings = templateObject(settings);
		});
		it('Does not affect static keys', function () {
			expect(settings.foo).toBe('bar');
		});
		it('Expands dynamic keys that refer to a static key', function () {
			expect(settings.expando).toBe('bar');
		});
		it('Expands dynamic keys that refer to another dynamic key', function () {
			expect(settings.expando2).toBe('bar');
		});
		it('Expands dynamic keys without affecting static text', function () {
			expect(settings.expando3).toBe('prefix-bar');
			expect(settings.expando4).toBe('bar-suffix');
			expect(settings.expando5).toBe('prefix-bar-suffix');
		});
		it('Replaces unknown keys with null', function () {
			expect(settings.expando6).toBeNull();
		});
	});
}(require('../')));
