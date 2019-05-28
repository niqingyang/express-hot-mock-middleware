module.exports = function (api) {
    api.cache(true);

    const presets = [
        [
            "@babel/env",
            {
                targets: {
                    chrome: "58",
                    ie: "11"
                },
                // "amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false
                modules: "auto"
            }
        ]
    ];
    const plugins = [];

    return {
        presets,
        plugins
    };
}