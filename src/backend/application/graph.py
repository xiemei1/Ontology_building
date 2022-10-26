import networkx as nx
import matplotlib.pyplot as plt 

def printGraph(triples):
    G = nx.Graph()
    for triple in triples:
        G.add_node(triple[0])
        G.add_node(triple[1])
        G.add_node(triple[2])
        G.add_edge(triple[0], triple[1])
        G.add_edge(triple[1], triple[2])

    pos = nx.spring_layout(G)
    plt.figure()
    nx.draw(G,pos, edge_color='black',width=3, linewidths=0,
            node_size=100, node_color='red',alpha=0.6)
    nx.draw_networkx_labels(G,pos, font_size=8)
    plt.axis('off')
    plt.show()
