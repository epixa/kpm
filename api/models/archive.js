'use strict';

import { S3 } from 'aws-sdk';
import { conflict } from 'boom';
import { updatePlugin } from './plugin';

export function uploadToS3(stream) {
  return function (done) {
    const s3obj = new S3({ profile: 'kpmpkgs', params: { Bucket: 'kpmpkgs' } });
    s3obj.upload({ Body: stream, Key: 'marvel/marvel-1.0.0.tgz' })
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
