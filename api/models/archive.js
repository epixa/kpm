'use strict';

import { S3 } from 'aws-sdk';
import { conflict } from 'boom';
import { updatePlugin } from './plugin';

const Bucket = 'kpmpkgs';
const ACL = 'public-read';

export function uploadToS3(plugin, version, stream) {
  const { name } = plugin;
  const { number } = version;
  const s3obj = new S3({ profile: 'kpmpkgs', params: { Bucket, ACL } });

  return new Promise((resolve, reject) => {
    s3obj.upload({ Body: stream, Key: `${name}/${name}-${number}.tgz` })
      .on('httpUploadProgress', evt => console.log('progress:', evt))
      .send((err, data) => {
        if (err) reject(err);
        else resolve (data);
      });
  });
}

export function updateWithArchive(plugin, version, url) {
  if (version.archive) throw conflict(`Version ${version.number} archive already uploaded`);
  version.archive = url;
  return updatePlugin(plugin);
}
