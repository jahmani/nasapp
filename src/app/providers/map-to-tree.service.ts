import { Injectable } from '@angular/core';
import { ExtMap, Extended, Person } from '../interfaces/data-models';

@Injectable({
  providedIn: 'root'
})
export class MapToTreeService {

  constructor() { }
  convert(NodeSnapshotMap: ExtMap<Extended<Person>>) {
    const rootNodes: Extended<Person>[] = [];
    const nullRoot: Extended<Person> = { ext: { sons: [], isExpanded: true } } as Extended<Person> ;

    /* TODO to be deleted*/
    NodeSnapshotMap.forEach(nodeSnapshot => {
      nodeSnapshot.ext = nodeSnapshot.ext || {};
      delete nodeSnapshot.ext.sons;
      nodeSnapshot.ext.isExpanded = false;
    });

    NodeSnapshotMap.forEach(datum => {
      //  datum.ext = datum.ext || {$isExpanded:true} as ExtType
      if (!datum.data.parentId) {
        rootNodes.push(datum);
        nullRoot.ext.sons.push(datum);
        datum.ext.parent = nullRoot;

        // TODO to be deleted
        datum.ext.isExpanded = false;
        //  delete rootNode.ext.$sons
      } else {
        const parentNode: Extended<Person> = NodeSnapshotMap.get(
          datum.data.parentId
        );
        datum.ext.parent = parentNode;
        //  parentNode.ext = parentNode.ext || {$isExpanded:true} as ExtType
        if (parentNode) {
          if (!parentNode.ext.sons) {
            parentNode.ext.sons = [];
          }
          parentNode.ext.sons.push(datum);
        }

      }
    });
    console.log(rootNodes);
    const focusedId = localStorage.getItem('focused');
    if (focusedId) {
      let focusedPerson = NodeSnapshotMap.get(focusedId);
      if (focusedPerson) {
        focusedPerson.ext.isExpanded = true;
        while (focusedPerson.data.parentId) {
          focusedPerson.ext.parent.ext.isExpanded = true;
          focusedPerson = focusedPerson.ext.parent;
        }
        }
    }

    return nullRoot; // { rootsArray: rootsArray, idToNodeMap:idToNodeMap };
  }
  /*
    export function ArrayToTree(_NodeSnapshotList:ExtendedData<TreeNode>[]) {
      var idToNodeMap = {};
      let rootNode : TreeNodeDataSnapshot
      let NodeSnapshotList = _NodeSnapshotList as TreeNodeDataSnapshot[]
      NodeSnapshotList.forEach(nodeSnapshot=>{
          idToNodeMap[nodeSnapshot.id] = nodeSnapshot
          delete nodeSnapshot.$sons
      })

      NodeSnapshotList.forEach((datum) => {
        if (typeof datum.data.parentId === "undefined") {
          rootNode = datum;
        }
          else
          {
          let parentNode = idToNodeMap[datum.data.parentId];
          datum.$parent = parentNode;
            if (!parentNode.$sons)
              parentNode.$sons = [];
            parentNode.$sons.push(datum);
          }
      })
      console.log(rootNode);

      return rootNode;// { rootsArray: rootsArray, idToNodeMap:idToNodeMap };

    }

    */

}
