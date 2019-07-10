"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../src/index");
var chai_1 = require("chai");
var controlMarker = 'controll-marker';
var getFreshSubject = function () { return ({
    a1: [{
            control: controlMarker
        }],
    control: controlMarker
}); };
var isNumber = function (i) { return typeof i === 'number'; };
describe('narrowArrayElemProp', function () {
    it('can adapt simple type guard to narrow down type of property of array element', function () {
        var subject = getFreshSubject();
        subject.a1[0].b2 = 8;
        if (index_1.narrowArrayElemProp(subject.a1, 'b2', isNumber)) {
            // this line checks that compiler has narrowed type of a1 to number
            var narrow = subject.a1[0].b2;
            chai_1.expect(narrow).to.equal(8);
            // this lines check that compiler has not narrowed type of  to number
            var control1 = subject.control;
            chai_1.expect(control1).to.equal(controlMarker);
            var control2 = subject.a1[0].control;
            chai_1.expect(control2).to.equal(controlMarker);
        }
        else {
            throw new Error('Should not get here.');
        }
    });
    it('when not every element passes the test, returns false', function () {
        var subject = getFreshSubject();
        subject.a1[0].b2 = 'a';
        if (index_1.narrowArrayElemProp(subject.a1, 'b2', isNumber)) {
            throw new Error('Should not get here.');
        }
        else {
            var control = subject.control; // this line checks that compiler has not narrowed type of control to number
            chai_1.expect(control).to.equal(controlMarker);
        }
    });
});
describe('narrowArrayElemProp + narrowArrayElement', function () {
    it('can narrow down array element property that is itself array', function () {
        var subject = getFreshSubject();
        subject.a1[0].b1 = [8];
        if (index_1.narrowArrayElemProp(subject.a1, 'b1', index_1.narrowArrayElement(isNumber))) {
            // this line checks that compiler has narrowed type of a1 to number
            var narrow = subject.a1[0].b1[0];
            chai_1.expect(narrow).to.equal(8);
            // this lines check that compiler has not narrowed type of  to number
            var control1 = subject.control;
            chai_1.expect(control1).to.equal(controlMarker);
            var control2 = subject.a1[0].control;
            chai_1.expect(control2).to.equal(controlMarker);
        }
        else {
            throw new Error('Should not get here.');
        }
    });
    it('when not every inner element of every outer elemnt passes the test, returns false', function () {
        var subject = getFreshSubject();
        subject.a1[0].b1 = [8];
        if (index_1.narrowArrayElemProp(subject.a1, 'b1', index_1.narrowArrayElement(isNumber))) {
            chai_1.expect(true).to.equal(true);
        }
        else {
            // can't just throw here, because clever compiler 
            // deduces that execution can only continue on successfull type check
            // and extends narrowing to the rest of the method
            chai_1.expect(false).to.equal(true);
        }
        subject.a1[1] = {
            b1: ['a'],
            b2: '',
            control: controlMarker
        };
        if (index_1.narrowArrayElemProp(subject.a1, 'b1', index_1.narrowArrayElement(isNumber))) {
            throw new Error('Should not get here.');
        }
        else {
            var control = subject.control; // this line checks that compiler has not narrowed type of control to number
            chai_1.expect(control).to.equal(controlMarker);
        }
    });
});
//# sourceMappingURL=intex.test.js.map