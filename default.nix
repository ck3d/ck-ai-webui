{ buildNpmPackage
, nodejs
, fetchFromGitHub
, makeWrapper
, fetchzip
, inter
, lib
}:
let
  package = lib.importJSON ./package.json;
in
buildNpmPackage rec {
  pname = package.name;
  inherit (package) version;

  src = ./.;

  npmDepsHash = "sha256-QUM66rBqq4Hd76BUv98tG4ySfyifx9VxLspOyLkV8cw=";

  nativeBuildInputs = [ makeWrapper ];

  # https://nextjs.org/telemetry
  env.NEXT_TELEMETRY_DISABLED = 1;

  postConfigure = ''
    cp ${inter.src}/*.ttf .
  '';

  # inspired by
  # https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
  postInstall = ''
    rm -r $out/lib
    dest=$out/share/${pname}
    mkdir -p $dest/.next $out/bin
    cp -r -t $dest .next/standalone/. public
    cp -r -t $dest/.next .next/static
    makeWrapper ${nodejs}/bin/node $out/bin/${pname} \
      --set NEXT_TELEMETRY_DISABLED 1 \
      --add-flags "$dest/server.js"
  '';
}
