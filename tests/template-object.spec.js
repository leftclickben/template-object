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
		describe('Using ERB style templates by default', function () {
			describe('With valid data', function () {
				var settings;
				beforeEach(function () {
					settings = templateObject(require('./_input/settings-erb.json'));
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
				it('Expands dynamic keys that are nested', function () {
					expect(settings.nested).toBe('child value');
				});
			});
			describe('With invalid data', function () {
				var settings, error;
				beforeEach(function () {
					try {
						settings = templateObject(require('./_input/settings-erb-with-unresolved.json'));
					} catch (e) {
						error = e;
					}
				});
				it('Does not return', function () {
					expect(settings).toBeUndefined();
				});
				it('Throws an error on unresolved reference', function () {
					expect(error).not.toBeUndefined();
					expect(error.message).toBe('unknown is not defined');
				});
			});
		});
		describe('Using mustache style templates', function () {
			describe('With valid data', function () {
				var settings;
				beforeEach(function () {
					settings = templateObject(require('./_input/settings-mustache.json'), 'mustache');
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
				it('Expands dynamic keys that are nested', function () {
					expect(settings.nested).toBe('child value');
				});
			});
			describe('With invalid data', function () {
				var settings, error;
				beforeEach(function () {
					try {
						settings = templateObject(require('./_input/settings-mustache-with-unresolved.json'), 'mustache');
					} catch (e) {
						error = e;
					}
				});
				it('Does not return', function () {
					expect(settings).toBeUndefined();
				});
				it('Throws an error on unresolved reference', function () {
					expect(error).not.toBeUndefined();
					expect(error.message).toBe('unknown is not defined');
				});
			});
		});
	});
}(require('../')));
