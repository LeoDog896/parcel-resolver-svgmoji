# [parcel](https://github.com/parcel-bundler/parcel)-resolver-[svgmoji](https://github.com/svgmoji/svgmoji)

create images from your favorite emojis!

```jsonc
// first, add the resolver in .parcelrc
"resolvers": ["parcel-resolver-svgmoji", "..."]
```

```html
<!-- set your favicon as a burger -->
<link rel="icon" type="image/x-icon" href="twemoji/🍔.svg" sizes="any" />

<!-- or maybe place it in an image? -->
<img src="notomoji/🚀.svg" width="40px" height="40px" />

<!-- you don't *have* to specify dimensions, but then you'll get a big emoji -->
<img src="blobmoji/💃.svg" />
```

```ts
// even use it in URLs!
const fishURL = new URL("openmoji/🐟.svg", import.meta.url);
```

## Credits

Check out the emoji repositories svgmoji uses:

- google's [notoemoji](https://github.com/googlefonts/noto-emoji)
- a fork of google's notoemoji, [blobmoji](https://github.com/c1710/blobmoji)
- twitter's [twemoji](https://github.com/twitter/twemoji) (remember! they are CC-BY-4.0, and have preferred attribution requirements.)
- [openmoji](https://github.com/hfg-gmuend/openmoji)

## Contributing

Go to the [contributing guide](./CONTRIBUTING.md) to learn how to contribute to this project.

## License

[MIT](./LICENSE)
