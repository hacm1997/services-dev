import { Injectable } from '@nestjs/common';

@Injectable()
export class S3Service {
  path = process.env.S3_SERVICE;
  formdata = new FormData();
  configFetchS3 = {
    method: 'POST',
    headers: {
      xsrfCookie: `tenant=multifildev`,
      'Content-Type': 'multipart/form-data',
    },
    body: this.formdata,
  };
  public async upload(fileKey: any) {
    this.formdata.append('uploaded_file', fileKey);
    return await fetch(
      `${process.env.FORM_S3_SERVICE_ENDPOINT as string}/api/v2/file/upload`,
      this.configFetchS3,
    )
      .then((response: any) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response);
        return response.data.data;
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return 'https://s3.amazonaws.com/gomedi.kru360.com/DEVELOPMFR/1677591913273portada2.jpg';
      });
  }
}
