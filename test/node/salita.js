try {
    var salita = require('salita');
} catch (err) {
    var salita = require('../../salita');
}

describe('salita devanagari converter', function() {
    describe('slp', function() {
        it('convert satyAnfta', function() {
            salita.slp2sa('satyAnfta').should.equal('सत्यानृत');
            salita.sa2slp('सत्यानृत').should.equal('satyAnfta');
        });
        it('convert satya', function() {
            salita.slp2sa('satya').should.equal('सत्य');
            salita.sa2slp('सत्य').should.equal('satya');
        });
        it('convert anfta', function() {
            salita.slp2sa('anfta').should.equal('अनृत');
            salita.sa2slp('अनृत').should.equal('anfta');
        });
        it('convert rAma', function() { // राम (rāma) + ऋद्धि (ṛddhi)
            salita.slp2sa('rAma').should.equal('राम');
        });
        it('convert fdDi', function() {
            salita.slp2sa('fdDi').should.equal('ऋद्धि');
            salita.sa2slp('ऋद्धि').should.equal('fdDi');
        });
        it('convert Uru', function() { // ऊरु Uru
            salita.slp2sa('Uru').should.equal('ऊरु'); //
            salita.sa2slp('ऊरु').should.equal('Uru');
        });
        it('convert kena', function() {
            salita.slp2sa('kena').should.equal('केन');
            salita.sa2slp('केन').should.equal('kena');
        });
        it('convert upanizat', function() {
            salita.slp2sa('upanizat').should.equal('उपनिषत्');
            salita.sa2slp('उपनिषत्').should.equal('upanizat');
        });
        it('convert kxpta', function() {
            salita.slp2sa('kxpta').should.equal('कॢप्त');
            salita.sa2slp('कॢप्त').should.equal('kxpta');
        });
        it('convert sraMsin', function() {
            salita.slp2sa('sraMsin').should.equal('स्रंसिन्');
            salita.sa2slp('स्रंसिन्').should.equal('sraMsin');
        });
        it('convert saMkA', function() {
            salita.slp2sa('saMkA').should.equal('संका');
            salita.sa2slp('संका').should.equal('saMkA');
        });
        it('convert apasalEH', function() {
            salita.slp2sa('apasalEH').should.equal('अपसलैः');
            salita.sa2slp('अपसलैः').should.equal('apasalEH');
        });
        // it('convert ', function() {
        //     salita.slp2sa('').should.equal('');
        //     salita.sa2slp('').should.equal('');
        // });
    });

    describe('iast', function() {
        it('convert satyAnfta', function() {
            salita.iast2sa('satyānṛta').should.equal('सत्यानृत');
            salita.sa2iast('सत्यानृत').should.equal('satyānṛta');
        });
        it('convert padacCeda', function() {
            salita.iast2sa('padaccheda').should.equal('पदच्छेद');
            // salita.sa2iast('पदच्छेद').should.equal('padaccheda');
        });

        it('convert satya', function() {
            salita.iast2sa('satya').should.equal('सत्य');
            salita.sa2iast('सत्य').should.equal('satya');
        });
        it('convert anfta', function() {
            salita.iast2sa('anṛta').should.equal('अनृत');
            salita.sa2iast('अनृत').should.equal('anṛta');
        });
        it('convert rAma', function() { // राम (rāma) + ऋद्धि (ṛddhi)
            salita.iast2sa('rāma').should.equal('राम');
            salita.sa2iast('राम').should.equal('rāma');
        });
        it('convert fdDi', function() {
            salita.iast2sa('ṛddhi').should.equal('ऋद्धि');
            salita.sa2iast('ऋद्धि').should.equal('ṛddhi');
        });
        it('convert Uru', function() { // ऊरु Uru
            salita.iast2sa('ūru').should.equal('ऊरु'); //
            salita.sa2iast('ऊरु').should.equal('ūru');
        });
        it('convert kena', function() {
            salita.iast2sa('kena').should.equal('केन');
            salita.sa2iast('केन').should.equal('kena');
        });
        it('convert upanizat', function() {
            salita.iast2sa('upaniṣat').should.equal('उपनिषत्');
            salita.sa2iast('उपनिषत्').should.equal('upaniṣat');
        });
        it('convert kxpta', function() {
            salita.iast2sa('kḷpta').should.equal('कॢप्त');
            salita.sa2iast('कॢप्त').should.equal('kḷpta');
        });
        it('convert sraMsin', function() {
            salita.iast2sa('sraṃsin').should.equal('स्रंसिन्');
            salita.sa2iast('स्रंसिन्').should.equal('sraṃsin');
        });
        it('convert saNkA', function() {
            salita.iast2sa('saṅkā').should.equal('सङ्का');
            salita.sa2iast('सङ्का').should.equal('saṅkā');
        });
        it('convert apasalEH', function() {
            salita.iast2sa('apasalaiḥ').should.equal('अपसलैः');
            // salita.sa2iast('अपसलैः').should.equal('apasalaiḥ');
        });

        it('convert Sivo\'am', function() {
            salita.iast2sa('').should.equal('');
            salita.sa2iast('शिवोऽहम्').should.equal('śivo\'ham');
        });

        // it('convert ', function() {
        //     salita.iast2sa('').should.equal('');
        //     salita.sa2iast('').should.equal('');
        // });
        // it('convert ', function() {
        //     salita.iast2sa('').should.equal('');
        //     salita.sa2iast('').should.equal('');
        // });
    });

});


function log() { console.log.apply(console, arguments) }
