package com.mycompany.store.repository;

import com.mycompany.store.domain.Reponse;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Reponse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReponseRepository extends JpaRepository<Reponse, Long> {
}
