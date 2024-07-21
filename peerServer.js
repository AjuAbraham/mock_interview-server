import {PeerServer} from "peer"

const peerService = PeerServer({ port: 9000, path: "/myapp" ,corsOptions:{
    origin:"*"
}});
