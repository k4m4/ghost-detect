'use strict'
const arrify      = require('arrify');
const pAny        = require('p-any');
const pify        = require('pify');
const pTimeout    = require('p-timeout');
const rp          = require('request-promise');
const cheerio     = require('cheerio');
const humanizeUrl = require('humanize-url');

function ghostDetect (target) {
  return rp(target)
    .then(function (htmlString) {
      const $ = cheerio.load(htmlString);
      var ghost = $('meta[name="generator"]').attr('content');
      if (ghost.toLowerCase().includes('ghost')) {
        return true;
      }
      return false;
    })
    .catch(function(err) {
      return false;
    })
}

module.exports = (dests, opts) => {
  opts = opts || {};
  opts.timeout = typeof opts.timeout === 'number' ? opts.timeout : 5000;

  const p = pAny(arrify(dests).map(ghostDetect));
  return pTimeout(p, opts.timeout).catch(() => false);
};