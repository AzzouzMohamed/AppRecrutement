package com.mycompany.store.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Candidat.
 */
@Entity
@Table(name = "candidat")
public class Candidat implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "full_name", nullable = false)
    private String fullName;

    @NotNull
    @Pattern(regexp = "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull
    @Column(name = "diplome", nullable = false)
    private String diplome;

    @NotNull
    @Column(name = "phone", nullable = false)
    private String phone;

    @NotNull
    @Column(name = "city", nullable = false)
    private String city;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "candidat")
    private Set<Resultat> resultats = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "candidats", allowSetters = true)
    private Poste poste;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public Candidat fullName(String fullName) {
        this.fullName = fullName;
        return this;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public Candidat email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDiplome() {
        return diplome;
    }

    public Candidat diplome(String diplome) {
        this.diplome = diplome;
        return this;
    }

    public void setDiplome(String diplome) {
        this.diplome = diplome;
    }

    public String getPhone() {
        return phone;
    }

    public Candidat phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCity() {
        return city;
    }

    public Candidat city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public User getUser() {
        return user;
    }

    public Candidat user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Resultat> getResultats() {
        return resultats;
    }

    public Candidat resultats(Set<Resultat> resultats) {
        this.resultats = resultats;
        return this;
    }

    public Candidat addResultat(Resultat resultat) {
        this.resultats.add(resultat);
        resultat.setCandidat(this);
        return this;
    }

    public Candidat removeResultat(Resultat resultat) {
        this.resultats.remove(resultat);
        resultat.setCandidat(null);
        return this;
    }

    public void setResultats(Set<Resultat> resultats) {
        this.resultats = resultats;
    }

    public Poste getPoste() {
        return poste;
    }

    public Candidat poste(Poste poste) {
        this.poste = poste;
        return this;
    }

    public void setPoste(Poste poste) {
        this.poste = poste;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Candidat)) {
            return false;
        }
        return id != null && id.equals(((Candidat) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Candidat{" +
            "id=" + getId() +
            ", fullName='" + getFullName() + "'" +
            ", email='" + getEmail() + "'" +
            ", diplome='" + getDiplome() + "'" +
            ", phone='" + getPhone() + "'" +
            ", city='" + getCity() + "'" +
            "}";
    }
}
