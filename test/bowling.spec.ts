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

        it('should return correct score after five consequent strikes', () => {
            bowlingGame.roll(10);
            expect(bowlingGame.getScore()).be.eq(10);
            bowlingGame.roll(10);
            expect(bowlingGame.getScore()).be.eq(30);
            bowlingGame.roll(10);
            expect(bowlingGame.getScore()).be.eq(60);
            bowlingGame.roll(10);
            expect(bowlingGame.getScore()).be.eq(90);
            bowlingGame.roll(10);
            expect(bowlingGame.getScore()).be.eq(120);
            bowlingGame.roll(4);
            expect(bowlingGame.getScore()).be.eq(132);
            bowlingGame.roll(4);
            expect(bowlingGame.getScore()).be.eq(140);
            bowlingGame.roll(5);
            expect(bowlingGame.getScore()).be.eq(145);
        });

        it('should return correct score after ten frames all with strikes', () => {
            new Array(12).fill(0).forEach(() => {
                bowlingGame.roll(10);
            });
            expect(bowlingGame.getScore()).be.eq(300);
            bowlingGame.roll(5);
            expect(bowlingGame.getScore()).be.eq(300);
        });

        it('should return correct score after 9 frames all with strikes and last frame with spare', () => {
            new Array(9).fill(0).forEach(() => {
                bowlingGame.roll(10);
            });
            expect(bowlingGame.getScore()).be.eq(240);
            bowlingGame.roll(5);
            expect(bowlingGame.getScore()).be.eq(255);
            bowlingGame.roll(5);
            expect(bowlingGame.getScore()).be.eq(265);
            bowlingGame.roll(4);
            // FIX me
            expect(bowlingGame.getScore()).be.eq(273);
        });

        it('should return correct score after 9 frames all with strikes and last frame without strikes/spares', () => {
            new Array(9).fill(0).forEach(() => {
                bowlingGame.roll(10);
            });
            expect(bowlingGame.getScore()).be.eq(240);
            bowlingGame.roll(2);
            expect(bowlingGame.getScore()).be.eq(246);
            bowlingGame.roll(3);
            expect(bowlingGame.getScore()).be.eq(252);
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

        it('should return correct score after two consequent spares', () => {
            bowlingGame.roll(5);
            expect(bowlingGame.getScore()).be.eq(5);
            bowlingGame.roll(5);
            expect(bowlingGame.getScore()).be.eq(10);
            bowlingGame.roll(7);
            expect(bowlingGame.getScore()).be.eq(24);
            bowlingGame.roll(3);
            expect(bowlingGame.getScore()).be.eq(27);
            bowlingGame.roll(3);
            expect(bowlingGame.getScore()).be.eq(33);
            bowlingGame.roll(5);
            expect(bowlingGame.getScore()).be.eq(38);
        });
    });
});
