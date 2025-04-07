# Running a Node

## System Requirements

#### Minimum

- 16-Core AMD or Intel CPU @ >2.5GHz
- 64GB RAM
- 512GB SSD

#### Recommended

- 32-Core CPU @ >3GHz with AVX512 support
- 128GB RAM with ECC memory
- 1TB NVMe SSD with separate disk for OS
- 1 Gigabit/s Network Bandwidth

## Build Instructions

Go to [releases](/releases) and get the tarball with the client source code.

From within the source directory:

1. Execute the `./deps.sh` script (confirm with “y”) to install system dependencies
2. Run `make -j fdctl` to build the `fdctl` binary.

Then, set up your node machine and create a config file using the [Testnet config example](/testnet.html#example-configuration). To start the validator:

- Run `fdctl configure init all --config /path/to/config.toml`
- Run `fdctl run --config /home/fogo/config.toml`

You can use the [Firedancer config options](https://docs.firedancer.io/guide/configuring.html#options) page for configuration options.
