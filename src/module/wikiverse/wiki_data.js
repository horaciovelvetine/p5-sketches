import axios from 'axios';

export default class WikiData { 
  constructor() {
    this.ALL_NODES = [];
    this.ALL_NODE_LINKS = [];
    // wikidata provides some downloadable data which may end up being useful here
    // requests can else be made to their API but per docs it is not recommended
    // https://www.wikidata.org/wiki/Wikidata:Database_download
  }
}

/* 
class ANON {

  ingestWikiTestData(data) {
    // data is an array of node objects
    this.createNodesFromWikiData(data);
    this.calculateAllNodeCords();
    return ALL_NODES;
  }

  createNodesFromWikiData(data) {
    // data is an array of node objects as JSON;
    data.forEach(nodeData => {
      // create all primary nodes which have data available for topLinks
      let topNode = new Node(nodeData.url, nodeData.topLinksTo);
      ALL_NODES.push(topNode);
    })

    ALL_NODES.forEach(node => {
      // create new nodes for each topLinked Node, these will have no topLink data themselves by default
      node.topLinksTo.forEach(link => {
        let nodeExistsAlready = ALL_NODES.find(existingNode => existingNode.url === link);
        if (!nodeExistsAlready) {
          let linkedNode = new Node(link, [], [node.id]);
          ALL_NODES.push(linkedNode);
        } else {
          nodeExistsAlready.topLinkedBy.push(node.id);
        }
      })
    })

    ALL_NODES.forEach(node => {
      // add references to the actual node objects to each node's topLink arrays
      node.topLinksTo = node.topLinksTo.map(link => {
        return ALL_NODES.find(node => node.url === link)
      })
      node.topLinkedBy = node.topLinkedBy.map(link => {
        return ALL_NODES.find(node => node.id === link)
      })
    })
  }

  calculateAllNodeCords() {
    ALL_NODES.forEach((node, i) => {
      if (i === 0) node.setCoordinates(0, 0, 0);

      //! CHECKS FOR LINKED NODES WITH EXISTING COORDINATES
      let linkedWithCords = [];

      node.topLinkedBy.forEach(linkedNode => {
        if (linkedNode.x !== null || linkedNode.y !== null || linkedNode.z !== null) {
          linkedWithCords.push(linkedNode);
        }
      })

      node.topLinksTo.forEach(linkedNode => {
        if (linkedNode.x !== null || linkedNode.y !== null || linkedNode.z !== null) {
          linkedWithCords.push(linkedNode);
        }
      });

      if (linkedWithCords.length > 0) {


        let linkCounts = [];
        linkedWithCords.forEach(linkedNode => {
          if (!linkCounts.find(link => link.id === linkedNode.id)) {
            linkCounts.push({ count: 1, id: linkedNode.id })
          } else if (linkCounts.find(link => link.id === linkedNode.id)) {
            linkCounts.find(link => link.id === linkedNode.id).count += 1;
          } else {
            console.log('could not find or count link in linkCounts array')
          }
        });


        linkCounts.forEach(link => {
          let radian = (Math.PI * 2) / link.count;
          let relatedNode = ALL_NODES.find(node => node.id === link.id);
          let radius = 200 / link.count;


          debugger;

        });
      }

    });

    console.log(ALL_NODES);
  }
}
*/