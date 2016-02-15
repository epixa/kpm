'use strict';

import { S3 } from 'aws-sdk';
import { conflict } from 'boom';
import { updatePlugin } from './plugin';

const ACL = 'public-read';

export function uploadToS3(s3Config, plugin, version, stream) {
  const { name } = plugin;
  const { number } = version;
  const { bucket, profile } = s3Config;

  if (!bucket) throw new Error(`No s3 bucket configured`);

  const s3obj = new S3({ profile, params: { Bucket: bucket, ACL } });

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
