try {
    var salita = require('salita');
} catch (err) {
    var salita = require('../../salita');
}

var tests = {
    'सत्यानृत': {slp: 'satyAnfta', iast: 'satyānṛta'},
    'पदच्छेद': {slp: 'padacCeda', iast: 'padaccheda'},
    'सत्य': {slp: 'satya', iast: 'satya'},
    'अनृत': {slp: 'anfta', iast: 'anṛta'},
    'राम': {slp: 'rAma', iast: 'rāma'},
    'ऋद्धि': {slp: 'fdDi', iast: 'ṛddhi'},
    'ऊरु': {slp: 'Uru', iast: 'ūru'},
    'केन': {slp: 'kena', iast: 'kena'},
    'उपनिषत्': {slp: 'upanizat', iast: 'upaniṣat'},
    'कॢप्त': {slp: 'kxpta', iast: 'kḷpta'},
    'स्रंसिन्': {slp: 'sraMsin', iast: 'sraṃsin'},
    'सङ्का': {slp: 'saNkA', iast: 'saṅkā'},
    'अपसलैः': {slp: 'apasalEH', iast: 'apasalaiḥ'},
    'शिवोऽहम्': {slp: 'Sivo\'ham', iast: 'śivo\'ham'},
    '': {slp: '', iast: ''},
    '': {slp: '', iast: ''},
    '': {slp: '', iast: ''},
}

describe('salita transliteration', function() {
    for (var test in tests) {
        if (test == '') continue;
        var trn = tests[test];
        var descr = [test, trn.slp, trn.iast].join(' - ');
        describe('descr', function() {
            // log('D', descr, 't', test, trn.slp, trn.iast);
            var iast = trn.iast;
            var slp = trn.slp;
            var res = test;
            var iast2sa = ['iast', iast, res].join(' - ');
            var sa2iast = ['iast', res, iast].join(' - ');
            var slp2sa = ['slp', slp, res].join(' - ');
            var sa2slp = ['slp', res, slp].join(' - ');
            it(iast2sa, function() {
                salita.iast2sa(iast).should.equal(res);
            });
            it(sa2iast, function() {
                salita.sa2iast(res).should.equal(iast);
            });

            it(slp2sa, function() {
                salita.slp2sa(slp).should.equal(res);
            });
            it(sa2slp, function() {
                salita.sa2slp(res).should.equal(slp);
            });

        });
    };
});



function log() { console.log.apply(console, arguments) }
