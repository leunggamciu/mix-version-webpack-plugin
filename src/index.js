const path = require('path');
const fs = require('fs');


function MixVersionPlugin(options = {}) {
    this.options = Object.assign({
        hashName: 'id',
        manifestName: 'mix-manifest.json'
    }, options);
}

MixVersionPlugin.prototype.apply = function(compiler) {

    compiler.hooks.done.tapAsync('MixVersion', (stats, callback) => {

        let { outputPath, publicPath, assets } = stats.toJson();

        let manifest = assets.reduce((manifestObj, asset) => {

            let hash = require('crypto').createHash('md5').update(
                fs.readFileSync(path.join(outputPath, asset.name))
            ).digest('hex');

            let absAssetName = path.join(publicPath.length == 0 ? '/' : publicPath, asset.name);
            let assetName = path.join('/', asset.name);

            manifestObj[assetName] = absAssetName + `?${this.options.hashName}=` + hash.substr(0, 20);

            return manifestObj;

        }, {});

        fs.writeFileSync(path.join(outputPath, this.options.manifestName), JSON.stringify(manifest, null, 4), 'utf8');

        callback();
    });

};


module.exports = MixVersionPlugin;