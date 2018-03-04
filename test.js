import test from 'ava';
import m from './';

test('ghost hostname', async t => {
	t.true(await m('https://nikolaskama.me'));
});

test('non-ghost hostname', async t => {
	t.false(await m('google.com'));
});

test('unreachable hostname', async t => {
	t.false(await m('34364533534123332049123125235623452344123.com'));
});

test('unreachable pathname', async t => {
	t.false(await m('https://google.com/notfound.js'));
});

test('with timeout', async t => {
	t.true(await m('https://nikolaskama.me', {timeout: 3000}));
});

test('with impossible timeout', async t => {
	t.false(await m('https://nikolaskama.me', {timeout: 1}));
});