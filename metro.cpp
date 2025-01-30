#include <bits/stdc++.h>
#include <fstream>
#define ll long long
#define pb push_back
#define fi first
#define se second
#define mp make_pair
using namespace std;

map<string, ll> M;
char color[200][200] = {'\0'};
ll N; // N is number of vertices
string station[200];
map<string, string> tourm;

pair<ll, ll> adj[100010][100]; 
ll adj_size[100010] = {0};    

void recharge() {
    fstream file("paisa.txt", ios::in | ios::out);
    if (!file) {
        cout << "Error: Could not open the file 'paisa.txt'. Please make sure it exists.\n";
        return;
    }

    ll card_id, amount, cid, balance;
    bool found = false;

    const int MAX_RECORDS = 1000; 
    ll card_ids[MAX_RECORDS], balances[MAX_RECORDS];
    int record_count = 0;

    
    while (file >> cid >> balance) {
        card_ids[record_count] = cid;
        balances[record_count] = balance;
        record_count++;
    }

    // User input
    cout << "\n=== Smart Card Recharge ===\n";
    cout << "Enter your Smart Card ID: ";
    cin >> card_id;
    cout << "Enter recharge amount: ";
    cin >> amount;

    
    for (int i = 0; i < record_count; i++) {
        if (card_ids[i] == card_id) {
            balances[i] += amount;
            found = true;

            cout << "\nRecharge successful!\n";
            cout << "Card ID: " << card_ids[i] << "\n";
            cout << "Recharge Amount: Rs." << amount << "\n";
            cout << "New Balance: Rs." << balances[i] << "\n";
            break;
        }
    }

    if (!found) {
        cout << "Error: Card ID " << card_id << " not found in the system.\n";
    }

    file.close(); 
    file.open("paisa.txt", ios::out | ios::trunc); 
    for (int i = 0; i < record_count; i++) {
        file << card_ids[i] << " " << balances[i] << "\n";
    }

    file.close(); 
}





void gettour() {
    ifstream fin;
    string s1, s2;
    fin.open("tourplace.txt", ios::in);
    if (!fin)
        cout << "Not Found\n";
    fin.seekg(0);
    fin.clear();
    while (!fin.eof()) {
        getline(fin, s1);
        getline(fin, s2);
        tourm[s1] = s2;
    }
    fin.close();
}

void disp(ll src, ll dest, ll par[]) {
    ll i, x, y, cn = 0, ci = 0;
    stack<ll> st;
    st.push(dest);
    i = dest;
    while (par[i] != -1) {
        i = par[i];
        st.push(i);
    }
    char col = '\0';
    while (!st.empty()) {
        x = st.top();
        st.pop();
        if (!st.empty())
            y = st.top();
        cout << station[x] << " ";
        cn++;
        if (col == '\0')
            col = color[x][y];
        else if (col != '\0' && col != color[x][y]) {
            char c = color[x][y];
            ci++;
            if (c == 'b')
                cout << "\t\tChange to blue line";
            else if (c == 'y')
                cout << "\t\tChange to yellow line";
            else if (c == 'o')
                cout << "\t\tChange to orange line";
            else if (c == 'g')
                cout << "\t\tChange to green line";
            else if (c == 'r')
                cout << "\t\tChange to red line";
            else if (c == 'v')
                cout << "\t\tChange to Violet line";
            col = c;
        }
        cout << endl;
    }
    cout << endl << "No of stations =" << cn << endl;
    cout << "No of interchange stations =" << ci - 1 << endl;
    cout << endl;
}

void bfs(ll src, ll dest) {
    bool vis[100010] = {false};
    ll par[100010];
    for (ll i = 0; i < N; i++)
        par[i] = -1;
    queue<ll> q;
    q.push(src);
    vis[src] = true;
    while (!q.empty()) {
        ll x = q.front();
        q.pop();
        for (ll i = 0; i < adj_size[x]; i++) {
            ll y = adj[x][i].fi;
            if (!vis[y]) {
                par[y] = x;
                vis[y] = true;
                q.push(y);
            }
        }
    }
    disp(src, dest, par);
}

void consmap() {
    ifstream fin;
    string s;
    fin.open("list.txt", ios::in);
    ll l = 0;
    fin.seekg(0);
    fin.clear();
    while (!fin.eof()) {
        getline(fin, s);
        M[s] = l;
        station[l] = s;
        l++;
    }
    N = l - 1;
    fin.close();
}
void addedge(const char fname[], ll w) {
    ifstream fin;
    string s;
    ll x, y;
    fin.open(fname, ios::in);
    fin.seekg(0);
    getline(fin, s);
    x = M[s];
    char c = fname[0];
    fin.clear();
    while (!fin.eof()) {
        getline(fin, s);
        y = M[s];
        adj[x][adj_size[x]++] = mp(y, w);
        adj[y][adj_size[y]++] = mp(x, w);
        color[x][y] = c;
        color[y][x] = c;
        x = y;
    }
    fin.close();
}


void consgraph() {
    string s;
    addedge("blueline.txt", 0);
    addedge("yellowline.txt", 0);
    addedge("redline.txt", 0);
    addedge("greenline.txt", 0);
    addedge("violetline.txt", 0);
    addedge("bluext.txt", 0);
    addedge("orangeline.txt", 1);
}

int main() {
    string source, destination;
    ll i, x, y, w, src, dest, k, choice, dec;
    char ch;
    gettour();
    consmap();
    do {
        cout << endl;
        cout << "1.To Route between two stations\n";
        cout << "2.To check nearest metro station to a tourist place\n";
        cout << "3.To Recharge your Smart Card\n";
        cin >> dec;
        switch (dec) {
        case 1:
            do {
                consgraph();
                cout << "Enter station 1\n";
                getline(cin, source);
                getline(cin, source);
                cout << "Enter station 2\n";
                getline(cin, destination);
                src = M[source];
                dest = M[destination];
                bfs(src, dest);
                cout << "Do you wish to check for any other station\n";
                cin >> ch;
            } while (ch == 'Y' || ch == 'y');
            break;
        case 2:
            do {
                string place;
                cout << "Enter a place\n";
                getline(cin, place);
                getline(cin, place);
                string st;
                st = tourm[place];
                cout << st << endl;
                cout << "Do you wish to check for any other place\n";
                cin >> ch;
            } while (ch == 'Y' || ch == 'y');
            break;
        case 3:
            do {
                recharge();
                cout << "Do you wish to recharge some other smart card\n";
                cin >> ch;
            } while (ch == 'Y' || ch == 'y');
            break;
        }
        cout << "Do you wish to go back to main menu\n";
        cin >> ch;
    } while (ch == 'Y' || ch == 'y');
    return 0;
}
