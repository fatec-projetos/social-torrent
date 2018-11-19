/**
 * Base de dados para projeto do Professor Thiago da Fatec.
 * Meu projeto é uma pequena comunidade para contribuição de links magnéticos para torrent, é uma rede social onde postamos os links magnéticos sem propraganda para fácil acesso.
 */
drop database if exists `open-torrent`;
create database `open-torrent`;
use `open-torrent`;

create table `membro` (
	id int primary key auto_increment,
	nome varchar(50) not null,
	nomedeusuario varchar(30) unique not null,
	senha varchar(150) not null
);

create table `link-magnetico` (
	id int primary key auto_increment,
	id_usuario int not null,
	titulo varchar(50) not null,
	imagem_url text,
	link_magnetico text,
	foreign key (id_usuario) references membro(id)
);

create table `comentario` (
	id int primary key auto_increment,
	id_usuario int not null,
	`id_link-magnetico` int not null,
	comentario varchar(150) not null,
    data datetime not null,
	estrelas int not null,
	foreign key (id_usuario) references membro(id),
	foreign key (`id_link-magnetico`) references `link-magnetico`(id)
);

/**
 * Alguns dados para demonstração
 */
insert into membro (id, nome, nomedeusuario, senha) values ("1", "Hiago Silva Souza", "hiagodotme", "123asdf");
insert into membro (id, nome, nomedeusuario, senha) values ("2", "Larissa Andrade", "larissa", "l1213");

insert into `link-magnetico` (id, id_usuario, titulo, imagem_url, link_magnetico) values ("1","1","Harry Potter - Todos os Filmes 1080p Dublado","https://www.boonfair.lk/wp-content/uploads/2018/07/Harrypotter-all-films-.jpg", "magnet:?xt=urn:btih:297C945AB4913AE6D215AA1FD61739A8B9A12534");
insert into `link-magnetico` (id, id_usuario, titulo, imagem_url, link_magnetico) values ("2","1","Game of Thrones 1ª Temporada Torrent – BluRay 720p","https://4.bp.blogspot.com/-y3QlT3QE-Gc/Vcu7kHYc-XI/AAAAAAAAA3U/zHAPiJw-h9E/s1600/Game%2Bof%2BThrones%2B1%25C2%25AA%2BTemporada.jpg", "magnet:?xt=urn:btih:3222958d59c10b222600e43f9ea5c6a161293658&amp;dn=Game+Of+Thrones%3A+1%26ordf%3B+Temporada+%282011%29+720p+Dual+Audio&amp;tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&amp;tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&amp;tr=udp%3A%2F%2Ftracker.istole.it%3A6969&amp;tr=udp%3A%2F%2Fopen.demonii.com%3A1337");
insert into `link-magnetico` (id, id_usuario, titulo, imagem_url, link_magnetico) values ("3","1","Torrent: Suits 1ª Temporada (2011)","https://3.bp.blogspot.com/-o5qDo24g2_Q/V6qdG-lzAFI/AAAAAAAAAhA/Y31qCXlykr81OoZao-BPKgAUzYspjy5fgCLcB/s1600/download.png", "magnet:?xt=urn:btih:9F4E118390CF69BFBC38CD3F121D1EE9BDC970C3&amp;dn=Suits%20%201%C2%AA%20Temporada%20%20%282011%29%20BDRip%20720p%20Dublado%20-%20WWW.&amp;tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&amp;tr=udp%3A%2F%2Ftracker.publicbt.com%3A80%2Fannounce&amp;tr=udp%3A%2F%2Ftracker.ccc.de%3A80%2Fannounce&quot;");
insert into `link-magnetico` (id, id_usuario, titulo, imagem_url, link_magnetico) values ("4","2","Garota Exemplar – Dublado Torrent BluRay 720p","https://4.bp.blogspot.com/-V00YuF-H0T0/VNaOUKvOhAI/AAAAAAAAfN0/qfIyB8MOI9A/s320/Garota%2BExemplar.jpg", "magnet:?xt=urn:btih:5A7D77D8256FBC37E46CCB144F3745565F5E2AE2&dn=Garota%20Exemplar%20%282014%29%20720p%205.1%20Dublado%20-%20Alan_680&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.ccc.de%3A80%2Fannounce%C2%A0Garota Exemplar – Dublado Torrent BluRay 720p / 1080p");

insert into comentario (id, id_usuario, `id_link-magnetico`, comentario, data, estrelas) values ("1", "1", "1", "Muito show, tem todos os filmes. Amei!", "2018-11-18 18:54:27", "5");
insert into comentario (id, id_usuario, `id_link-magnetico`, comentario, data, estrelas) values("2","1","2","Top demais galera", "2018-11-18 22:47:29", "5");
insert into comentario (id, id_usuario, `id_link-magnetico`, comentario, data, estrelas) values("3","2","3","Melhor série <3", "2018-11-18 22:53:29", "3");
insert into comentario (id, id_usuario, `id_link-magnetico`, comentario, data, estrelas) values("4","2", "2", "Amooo <3", "2018-11-18 22:53:59", "4");
insert into comentario (id, id_usuario, `id_link-magnetico`, comentario, data, estrelas) values("5","2", "1", "Ah eu não gosto nem da J. K. Rowling nem do Harry Potter!", "2018-11-18 22:54:48", "1");
insert into comentario (id, id_usuario, `id_link-magnetico`, comentario, data, estrelas) values("6","1", "4", "Vou assistir parece bom!", "2018-11-18 22:59:31", "5");
