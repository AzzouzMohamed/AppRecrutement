package com.mycompany.store.repository;

import com.mycompany.store.domain.Examin;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Examin entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExaminRepository extends JpaRepository<Examin, Long> {
}
