import axios from 'axios';
export class SendClientHubsportService {
  async sendClientHubsport(client: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const urlHubsport = process.env.APP_HUBSPORT_CLIENT as string;
      const buildData = {
        properties: {
          firstname: client.firstname,
          email: client.email,
          phone: client.phone,
          state: client.state,
          city: client.city,
          address: client.address,
          legal_service: client.servicio,
          aceptar_noticia: client.noticia,
        },
      };
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: urlHubsport,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${client.token}`,
        },
        data: buildData,
      };
      axios
        .request(config)
        .then(async (res) => {
          if (res.data) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((err) => {
          console.log('No se pudo guardar el cliente o hubo un error', err);
          reject('not found');
        });
    });
  }
  async getClientHubsport(token: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const urlHubsport = process.env.APP_HUBSPORT_CLIENT as string;
      const buildData = {
        properties: [
          'firstname',
          'email',
          'phone',
          'state',
          'city',
          'address',
          'legal_service',
          'aceptar_noticia',
        ],
        sorts: [
          {
            propertyName: 'createdate',
            direction: 'DESCENDING',
          },
        ],
      };
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${urlHubsport}/search`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: buildData,
      };
      axios
        .request(config)
        .then(async (res) => {
          if (res.data) {
            resolve(res.data.results);
          } else {
            resolve([]);
          }
        })
        .catch((err) => {
          console.log('No se pudo guardar el cliente o hubo un error', err);
          reject('not found');
        });
    });
  }
  async DeleteClientHubsport(id: string, token: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const urlHubsport = process.env.APP_HUBSPORT_CLIENT as string;
      const config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${urlHubsport}/${id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .request(config)
        .then(async (res) => {
          if (res.status === 204) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((err) => {
          console.log('No se pudo guardar el cliente o hubo un error', err);
          reject('not found');
        });
    });
  }
}
