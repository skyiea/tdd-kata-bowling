import {expect} from 'chai';

import BowlingGame from '../src/BowlingGame';

describe('Bowling Game', () => {
    let bowlingGame;

    beforeEach(() => {
        bowlingGame = new BowlingGame();
    });

    it('should throw error if passed pings value is not in [0, 10] range', () => {
        expect(() => bowlingGame.roll(-1)).to.throw();
        expect(() => bowlingGame.roll(15)).to.throw();
    });

    it('should not change score if incorrect pins value was passed', () => {
        expect(() => bowlingGame.roll(-1)).to.throw();
        expect(bowlingGame.getScore()).be.eq(0);
    });

    it('should not throw if passed pins value is valid', () => {
        expect(() => bowlingGame.roll(5)).not.to.throw();
    });

    it('should return correct score after multiple rolls', () => {
        bowlingGame.roll(5);
        expect(bowlingGame.getScore()).be.eq(5);
        bowlingGame.roll(7);
        expect(bowlingGame.getScore()).be.eq(12);
    });

    describe('Strike Rule', () => {
        it('should return correct score after single strike', () => {
            bowlingGame.roll(10);
            expect(bowlingGame.getScore()).be.eq(10);
            bowlingGame.roll(5);
            expect(bowlingGame.getScore()).be.eq(20);
            bowlingGame.roll(4);
            expect(bowlingGame.getScore()).be.eq(28);
            bowlingGame.roll(3);
            expect(bowlingGame.getScore()).be.eq(31);
        });

        it('should return correct score after two consequent strikes', () => {
            bowlingGame.roll(10);
            expect(bowlingGame.getScore()).be.eq(10);
            bowlingGame.roll(10);
            expect(bowlingGame.getScore()).be.eq(30);
            bowlingGame.roll(4);
            expect(bowlingGame.getScore()).be.eq(42);
            bowlingGame.roll(4);
            expect(bowlingGame.getScore()).be.eq(50);
            bowlingGame.roll(5);
            expect(bowlingGame.getScore()).be.eq(55);
        });

        it('should return correct score after three consequent strikes', () => {
            bowlingGame.roll(10);
            expect(bowlingGame.getScore()).be.eq(10);
            bowlingGame.roll(10);
            expect(bowlingGame.getScore()).be.eq(30);
            bowlingGame.roll(10);
            expect(bowlingGame.getScore()).be.eq(60);
            bowlingGame.roll(4);
            expect(bowlingGame.getScore()).be.eq(72);
            bowlingGame.roll(4);
            expect(bowlingGame.getScore()).be.eq(80);
            bowlingGame.roll(5);
            expect(bowlingGame.getScore()).be.eq(85);
        });
    });

    describe('Spare Rule', () => {
        it('should return correct score after spare', () => {
            bowlingGame.roll(5);
            expect(bowlingGame.getScore()).be.eq(5);
            bowlingGame.roll(5);
            expect(bowlingGame.getScore()).be.eq(10);
            bowlingGame.roll(7);
            expect(bowlingGame.getScore()).be.eq(24);
        });
    });
});
