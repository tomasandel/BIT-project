from ldap3 import Server, Connection, ALL
from ldap3.utils.conv import escape_filter_chars

server = Server('ldap://localhost', get_info=ALL)
conn = Connection(server, user='cn=admin,dc=nodomain', password='root')

if not conn.bind():
    print("Failed to connect to LDAP server")
    exit()

def search_user(user_input):
    search_filter = f"(uid={user_input})"
    print(f"Sending LDAP filter: {search_filter}")

    conn.search('ou=People,dc=nodomain', search_filter, attributes=['uid', 'cn', 'sn'])
    return conn.entries

print("Normal search:")
print(search_user("John"))

print("\nInjection test:")
print(search_user("*"))