'use strict';

import { S3 } from 'aws-sdk';
import { conflict } from 'boom';
import { updatePlugin } from './plugin';

const Bucket = 'kpmpkgs';
const ACL = 'public-read';

export function uploadToS3(plugin, version, stream) {
  return function (done) {
    const { name } = plugin;
    const { number } = version;
    const s3obj = new S3({ profile: 'kpmpkgs', params: { Bucket, ACL } });
    s3obj.upload({ Body: stream, Key: `${name}/${name}-${number}.tgz` })
      .on('httpUploadProgress', evt => console.log('progress:', evt))
      .send(done);
  };
}

export function updateWithArchive(plugin, version, url) {
  return done => {
      try {
        if (version.archive) throw conflict(`Version ${version.number} archive already uploaded`);
        version.archive = url;
        updatePlugin(plugin)(done);
      } catch (err) {
        done(err);
      }
    }
}
