# SUJET 1

### Voici le dictionnaire de données : 

![alt text](image-3.png)

### Voici mon MDC :


# SUJET 2

Voici mon dictionnaire de donées : 
![alt text](image.png)

### Voici mon MDC : 

![alt text](image-1.png)


### Voici mon MLD et le MLD relationnelle : 
![alt text](image-2.png)
Sportif (  #NumSportif,   NomSportif,   PrenomSportif,   Adresse,   CP,   Ville,   TelSportif,   fax,   Mail,   NumLicense,   CertifMedic,   dateCertif,   Club  )

Compet (  #numCompet,   dateCompet,   nomCompet,   VilleCompet  )

Epreuve (  #NumEpreuve,   DistanceEpreuve,   numCompet_Compet,   NumTypeEpreuve_Type Epreuve  )

Type Epreuve (  #NumTypeEpreuve,   LibEpreuve  )

Inscription (  #numDossard,   NumSportif_Sportif,   numCompet_Compet  )

### Voici mon script sql : 

Ce script fonctionne.

```sql
CREATE TABLE Sportif (
    NumSportif       Numeric(2) UNSIGNED,
    NomSportif       VARCHAR(20),
    PrenomSportif    VARCHAR(20),
    Adresse          VARCHAR(30),
    CP               Numeric(5) UNSIGNED,
    Ville            VARCHAR(15),
    TelSportif       VARCHAR(10),
    Fax              VARCHAR(10),
    Mail             VARCHAR(30),
    NumLicense       VARCHAR(10),
    CertifMedic      BOOLEAN,
    DateCertif       DATE,
    Club             VARCHAR(10),
    PRIMARY KEY (NumSportif)
) ENGINE=InnoDB;

CREATE TABLE Compet (
    NumCompet       Numeric(2) UNSIGNED,
    DateCompet      DATE,
    NomCompet       VARCHAR(10),
    VilleCompet     VARCHAR(10),
    PRIMARY KEY (NumCompet)
) ENGINE=InnoDB;

CREATE TABLE TypeEpreuve (
    NumTypeEpreuve   Numeric(2) UNSIGNED,
    LibEpreuve       VARCHAR(15),
    PRIMARY KEY (NumTypeEpreuve)
) ENGINE=InnoDB;

CREATE TABLE Epreuve (
    NumEpreuve                Numeric(2) UNSIGNED,
    DistanceEpreuve           Numeric(2) UNSIGNED,
    NumCompet_Compet          Numeric(2) UNSIGNED,
    NumTypeEpreuve_TypeEpreuve Numeric(2) UNSIGNED,
    PRIMARY KEY (NumEpreuve),
    FOREIGN KEY (NumCompet_Compet) REFERENCES Compet(NumCompet) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (NumTypeEpreuve_TypeEpreuve) REFERENCES TypeEpreuve(NumTypeEpreuve) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Inscription (
    NumDossard         Numeric(4) UNSIGNED,
    NumSportif_Sportif Numeric(2) UNSIGNED,
    NumCompet_Compet   Numeric(2) UNSIGNED,
    PRIMARY KEY (NumDossard),
    FOREIGN KEY (NumSportif_Sportif) REFERENCES Sportif(NumSportif) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (NumCompet_Compet) REFERENCES Compet(NumCompet) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

```