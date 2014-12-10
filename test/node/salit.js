try {
    var salit = require('salit');
} catch (err) {
    var salit = require('../../salit');
}

describe('salit devanagari converter', function() {
    describe('slp', function() {
        it('convert satyAnfta', function() {
            salit.slp2sa('satyAnfta').should.equal('सत्यानृत');
            salit.sa2slp('सत्यानृत').should.equal('satyAnfta');
        });
        it('convert satya', function() {
            salit.slp2sa('satya').should.equal('सत्य');
            salit.sa2slp('सत्य').should.equal('satya');
        });
        it('convert anfta', function() {
            salit.slp2sa('anfta').should.equal('अनृत');
            salit.sa2slp('अनृत').should.equal('anfta');
        });
        it('convert rAma', function() { // राम (rāma) + ऋद्धि (ṛddhi)
            salit.slp2sa('rAma').should.equal('राम');
        });
        it('convert fdDi', function() {
            salit.slp2sa('fdDi').should.equal('ऋद्धि');
            salit.sa2slp('ऋद्धि').should.equal('fdDi');
        });
        it('convert Uru', function() { // ऊरु Uru
            salit.slp2sa('Uru').should.equal('ऊरु'); //
            salit.sa2slp('ऊरु').should.equal('Uru');
        });
        it('convert kena', function() {
            salit.slp2sa('kena').should.equal('केन');
            salit.sa2slp('केन').should.equal('kena');
        });
        it('convert upanizat', function() {
            salit.slp2sa('upanizat').should.equal('उपनिषत्');
            salit.sa2slp('उपनिषत्').should.equal('upanizat');
        });
        it('convert kxpta', function() {
            salit.slp2sa('kxpta').should.equal('कॢप्त');
            salit.sa2slp('कॢप्त').should.equal('kxpta');
        });
        it('convert sraMsin', function() {
            salit.slp2sa('sraMsin').should.equal('स्रंसिन्');
            salit.sa2slp('स्रंसिन्').should.equal('sraMsin');
        });
        it('convert saMkA', function() {
            salit.slp2sa('saMkA').should.equal('संका');
            salit.sa2slp('संका').should.equal('saMkA');
        });
        it('convert apasalEH', function() {
            salit.slp2sa('apasalEH').should.equal('अपसलैः');
            salit.sa2slp('अपसलैः').should.equal('apasalEH');
        });
        // it('convert ', function() {
        //     salit.slp2sa('').should.equal('');
        //     salit.sa2slp('').should.equal('');
        // });
        // it('convert ', function() {
        //     salit.slp2sa('').should.equal('');
        // });
        // it('convert ', function() {
        //     salit.slp2sa('').should.equal('');
        // });
        // it('convert ', function() {
        //     salit.slp2sa('').should.equal('');
        // });
        // it('convert ', function() {
        //     salit.slp2sa('').should.equal('');
        // });
    });
});


function log() { console.log.apply(console, arguments) }
