# Instructions on updating the version for this repo

1. Be sure to run yarn install and then yarn dev to spin up the project and be sure there aren't any errors.
2. When changing the version for release, you should change the version in the `package.json`. Then be sure to update both the `peerDependencies` as well as the `devDependencies`.

# Local Testing Instructions

1. Make whatever changes that you need to make.
2. Download and install `pnpm`. Once installed run `pnpm install` and then `pnpm build.`
3. Download and install `yalc`. Inside this repo run `yalc publish`. Take note of the `package-name` published to the store
4. `cd` into the `frontend` directory of the repo that you are testing WUI with.
5. Run `yalc add package-name`, this will create a `.yalc` directory with the package contents. Your `package.json` file should have been updated and have something like this: `"@bequestinc/wui": "file:.yalc/@bequestinc/wui"`
6. We need to copy the contents of the local `.yalc` directory into our container. To do this add `COPY .yalc /code/.yalc` before the `yarn install` command is called inside of the `frontend/Dockerfile.local` file.

# Troubleshooting Testing

There is a chance that you did everything correctly but you do not see the changes you made reflected. If that's the case you may need to clear any caching that `docker` has performed. This can be done by deleting the volume that contains the `node_modules`. To do that we need to do a few things, first you need to get the hash of the frontend container by running `docker container ls`. Once your have the name, run the following command and looks for the `Mounts` section: `docker container inspect yourhash`. Look at the entries in the `Mounts` section and find the entry that has a destination containing `node_modules`, note the `name` of  this entry. Run `docker volume rm volumehash`. Rebuild your image `docker compose build --no-cache`, and run your containers, `docker compose up`, your changes should now be present

