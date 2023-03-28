/* eslint-disable @typescript-eslint/naming-convention, no-shadow */

export enum ConnectionState {
    Disconnected = 0,
    Connecting = 1,
    Connected = 2,
    Disconnecting = 3
}

export enum ConnectionStateTexts {
    Disconnected = 'Odpojen',
    Connecting = 'Připojování',
    Connected = 'Připojen',
    Disconnecting = 'Odpojování'
}

export enum ConnectionStateColors {
    Disconnected = 'danger',
    Connecting = 'warning',
    Connected = 'success',
    Disconnecting = 'danger'
}
