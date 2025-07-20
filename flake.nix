{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
    mkCli.url = "github:cprussin/mkCli";
  };

  outputs = {
    nixpkgs,
    flake-utils,
    mkCli,
    ...
  }: let
    cli-overlay = nixpkgs.lib.composeExtensions mkCli.overlays.default (final: _: {
      cli = final.lib.mkCli "cli" {
        _noAll = true;

        start = "${final.lib.getExe final.pnpm} npm run docs:dev";

        test = {
          nix = {
            lint = "${final.statix}/bin/statix check --ignore node_modules .";
            dead-code = "${final.deadnix}/bin/deadnix --exclude ./node_modules .";
            format = "${final.alejandra}/bin/alejandra --exclude ./node_modules --check .";
          };
        };

        fix = {
          nix = {
            lint = "${final.statix}/bin/statix fix --ignore node_modules .";
            dead-code = "${final.deadnix}/bin/deadnix --exclude ./node_modules -e .";
            format = "${final.alejandra}/bin/alejandra --exclude ./node_modules .";
          };
        };
      };
    });

    project-shell-overlay = final: _: {
      project-shell = final.mkShell {
        name = "project-shell";
        buildInputs = [
          final.cli
          final.git
          final.nodejs
        ];
      };
    };
  in
    (flake-utils.lib.eachDefaultSystem
      (
        system: let
          pkgs = import nixpkgs {
            inherit system;
            overlays = [cli-overlay project-shell-overlay];
            config = {};
          };
        in {
          packages = {
            inherit (pkgs) cli project-shell;
          };
          devShells.default = pkgs.project-shell;
        }
      ))
    // {
      overlays = {
        cli = cli-overlay;
        project-shell = project-shell-overlay;
      };
    };
}
